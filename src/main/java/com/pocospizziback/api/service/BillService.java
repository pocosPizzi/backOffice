package com.pocospizziback.api.service;

import com.pocospizziback.api.bases.PageReq;
import com.pocospizziback.api.bases.PageRes;
import com.pocospizziback.api.config.i18n.Messages;
import com.pocospizziback.api.config.i18n.ServiceException;
import com.pocospizziback.api.domain.StatusBill;
import com.pocospizziback.api.domain.TypeBill;
import com.pocospizziback.api.dto.req.BillReqDTO;
import com.pocospizziback.api.dto.req.ReportBillReqDTO;
import com.pocospizziback.api.dto.res.BillByClientResDTO;
import com.pocospizziback.api.dto.res.BillResDTO;
import com.pocospizziback.api.model.Bill;
import com.pocospizziback.api.model.Client;
import com.pocospizziback.api.model.ParcelPeriod;
import com.pocospizziback.api.repository.BillRepository;
import com.pocospizziback.api.util.SearchUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BillService {

    @Autowired
    private BillRepository repository;

    @Autowired
    private ClientService clientService;

    public void logicalExclusion(Long id) {

        if (this.repository.findByIdAndNotDeleted(id).isEmpty())
            throw new ServiceException(Messages.use_not_found);

        this.repository.softDelete(id);
    }

    public void logicalExclusionList(List<Bill> billList) {

        if (billList != null) {
            billList.forEach(bill -> {
                this.logicalExclusion(bill.getId());
            });
        }
    }

    public BillResDTO findByIdDTO(Long id) {

        return BillResDTO.of(this.findById(id));
    }

    public Bill findById(Long id) {
        return this.repository.findById(id).orElseThrow(() -> new ServiceException(Messages.bill_not_found));
    }

    public PageRes<BillResDTO> findAll(PageReq query) {

        Specification<Bill> deleted = SearchUtils.specByDeleted(query.isDeleted());
        Specification<Bill> filters = SearchUtils.specByFilter(query.getFilter(), "name", "typeBill", "id", "dueDate", "value",
                "debtor", "beneficiary", "statusBill");
        Page<Bill> page = this.repository.findAll(deleted.and(filters), query.toPageRequest());

        return new PageRes<>(page.getContent().stream().map(BillResDTO::of).collect(Collectors.toList()),
                page.getTotalElements(), page.getTotalPages());
    }

    public List<Bill> findAllBillNotIsPaid() {

        return this.repository.findByIsPaidIsFalseAndDeletedIsFalse();
    }

    public void updateAllStatusBill() {
        this.findAllBillNotIsPaid().forEach(bill -> {
            this.updateStatusBill(bill);
        });
    }

    public void updateStatusBill(Bill entity) {

        LocalDate today = LocalDate.now();

        StatusBill newStatus;

        if (entity.getDueDate().isAfter(today)) {
            newStatus = entity.getTypeBill().equals(TypeBill.RECEIVE) ? StatusBill.RECEIVABLE : StatusBill.PAYABLE;
        } else {
            newStatus = StatusBill.IN_LATE;
        }

        entity.setStatusBill(newStatus);

        this.repository.save(entity);
    }

    public void updateStatusBillRes(Bill entity) {

        LocalDate today = LocalDate.now();

        if (entity.getIsPaid() && entity.getStatusBill() != StatusBill.PAID) {
            entity.setStatusBill(StatusBill.PAID);
        } else {

            if (entity.getDueDate().isAfter(today)) {
                StatusBill newStatus = entity.getTypeBill().equals(TypeBill.RECEIVE) ? StatusBill.RECEIVABLE : StatusBill.PAYABLE;
                entity.setStatusBill(newStatus);
            } else {
                entity.setStatusBill(StatusBill.IN_LATE);
            }
        }
    }

    public void updateStatusBillRes(BillReqDTO dto) {

        LocalDate today = LocalDate.now();

        if (dto.getIsPaid()) {
            dto.setStatusBill(StatusBill.PAID);
        } else {

            if (dto.getDueDate().isAfter(today)) {
                StatusBill newStatus = dto.getTypeBill().equals(TypeBill.RECEIVE) ? StatusBill.RECEIVABLE : StatusBill.PAYABLE;
                dto.setStatusBill(newStatus);
            } else {
                dto.setStatusBill(StatusBill.IN_LATE);
            }
        }
    }

    public BillResDTO save(BillReqDTO dto) {

        Bill bill = dto.toEntity(new Bill());

        this.updateStatusBillRes(bill);

        verifyClient(dto.getIdClient(), bill);

        return BillResDTO.of(this.repository.save(bill));
    }

    private Bill verifyClient(Long id, Bill bill) {

        if (id != null) {
            Client client = this.clientService.findById(id);
            bill.setClient(client);
            bill.setDebtor(client.getNameClient());
            bill.setName(client.getNameClient());
        } else {
            bill.setName(bill.getBeneficiary());
        }

        return bill;
    }

    public BillResDTO update(Long id, BillReqDTO dto) {

        this.updateStatusBillRes(dto);

        Bill bill = dto.toEntity(this.findById(id));

        verifyClient(dto.getIdClient(), bill);

        return BillResDTO.of(this.repository.save(bill));
    }

    public ReportBillReqDTO findReportByPeriod(LocalDate dateStart, LocalDate dateFinal) {

        List<Bill> listBill = this.repository.findByDeletedIsFalseAndDueDateBetween(dateStart, dateFinal);
        DecimalFormat form = new DecimalFormat("#.##");

        Double totalTypeBillPay = listBill
                .stream()
                .filter(bill -> bill.getTypeBill().equals(TypeBill.PAY)).map(Bill::getValue)
                .collect(Collectors.summingDouble(Double::doubleValue));

        Double totalTypeBillReceive = listBill
                .stream()
                .filter(bill -> bill.getTypeBill().equals(TypeBill.RECEIVE)).map(Bill::getValue)
                .collect(Collectors.summingDouble(Double::doubleValue));

        Double totalInLateTypeBillPay = listBill
                .stream()
                .filter(bill -> bill.getTypeBill().equals(TypeBill.PAY) && bill.getStatusBill().equals(StatusBill.IN_LATE)).map(Bill::getValue)
                .collect(Collectors.summingDouble(Double::doubleValue));

        Double totalInLateTypeBillReceive = listBill
                .stream()
                .filter(bill -> bill.getTypeBill().equals(TypeBill.RECEIVE) && bill.getStatusBill().equals(StatusBill.IN_LATE)).map(Bill::getValue)
                .collect(Collectors.summingDouble(Double::doubleValue));

        Double totalPaidTypeBillPay = listBill
                .stream()
                .filter(bill -> bill.getTypeBill().equals(TypeBill.PAY) && bill.getStatusBill().equals(StatusBill.PAID)).map(Bill::getValue)
                .collect(Collectors.summingDouble(Double::doubleValue));

        Double totalPaidTypeBillReceive = listBill
                .stream()
                .filter(bill -> bill.getTypeBill().equals(TypeBill.RECEIVE) && bill.getStatusBill().equals(StatusBill.PAID)).map(Bill::getValue)
                .collect(Collectors.summingDouble(Double::doubleValue));

        Double totalReceivable = listBill
                .stream()
                .filter(bill -> bill.getStatusBill().equals(StatusBill.RECEIVABLE)).map(Bill::getValue)
                .collect(Collectors.summingDouble(Double::doubleValue));

        Double totalPayable = listBill
                .stream()
                .filter(bill -> bill.getStatusBill().equals(StatusBill.PAYABLE)).map(Bill::getValue)
                .collect(Collectors.summingDouble(Double::doubleValue));

        Double totalLiquid = totalTypeBillReceive - totalTypeBillPay;

        return ReportBillReqDTO.builder()
                .totalTypeBillPay(form.format(totalTypeBillPay))
                .totalTypeBillReceive(form.format(totalTypeBillReceive))
                .totalInLateTypeBillPay(form.format(totalInLateTypeBillPay))
                .totalInLateTypeBillReceive(form.format(totalInLateTypeBillReceive))
                .totalPaidTypeBillPay(form.format(totalPaidTypeBillPay))
                .totalPaidTypeBillReceive(form.format(totalPaidTypeBillReceive))
                .totalReceivable(form.format(totalReceivable))
                .totalPayable(form.format(totalPayable))
                .totalLiquid(form.format(totalLiquid))
                .build();
    }

    public BillByClientResDTO findByClient(Long idClient) {

        Client client = this.clientService.findById(idClient);

        List<Bill> bills = this.repository.findByClientAndDeletedIsFalseOrderByDueDate(client);

        List<BillResDTO> billResDTOS = bills.stream().map(BillResDTO::of).collect(Collectors.toList());

        return BillByClientResDTO.of(client, billResDTOS);
    }

    public void updatePaid(Long id, Boolean paid) {

        Bill bill = this.findById(id);

        bill.setIsPaid(paid);

        this.updateStatusBillRes(bill);

        this.repository.save(bill);

    }

    public Double calcValueParcel(Integer totalParcel, Double valueTotalJob, Double downPayment) {

        return (valueTotalJob - downPayment) / totalParcel;
    }

    public List<Bill> createBillsByJob(Client client, LocalDate dateStartParcel, Integer totalParcel, Double valueTotalJob, Double downPayment, ParcelPeriod parcelPeriod) {

        List<Bill> billList = new ArrayList<>();
        Double valueEachParcel = this.calcValueParcel(totalParcel, valueTotalJob, downPayment);

        if(downPayment.equals(0D) == false){

            Bill newBill = Bill.builder()
                    .client(client)
                    .description("Valor de entrada")
                    .dueDate(LocalDate.now())
                    .isPaid(true)
                    .name(client.getNameClient())
                    .value(downPayment)
                    .typeBill(TypeBill.RECEIVE)
                    .statusBill(StatusBill.PAID)
                    .build();

            this.repository.save(newBill);


            billList.add(newBill);
        }

        LocalDate dueDate = dateStartParcel;

        for (int i = 0; i < totalParcel; i++) {

            String parcelCurrent = String.valueOf(i + 1);
            String description = "Parcela "+parcelCurrent+"/"+totalParcel;

            if (i != 0)
                dueDate = this.newDueDate(dueDate, parcelPeriod);

            Bill newBill = Bill.builder()
                    .client(client)
                    .description(description)
                    .dueDate(dueDate)
                    .isPaid(false)
                    .name(client.getNameClient())
                    .value(valueEachParcel)
                    .typeBill(TypeBill.RECEIVE)
                    .build();

            this.repository.save(newBill);

            this.updateStatusBill(newBill);

            billList.add(newBill);
        }

        return billList;
    }

    public LocalDate newDueDate(LocalDate dueDate, ParcelPeriod parcelPeriod){

        LocalDate newDate = LocalDate.now();

        switch (parcelPeriod.getDescription()) {
            case (1):
                newDate = dueDate.plusWeeks(1);
                break;
            case (2):
                newDate = dueDate.plusDays(15);
                break;
            default:
                newDate = dueDate.plusMonths(1);
                break;
        }
        return newDate;

    }
}
