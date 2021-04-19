package com.pocospizziback.api.service;

import com.pocospizziback.api.bases.PageReq;
import com.pocospizziback.api.bases.PageRes;
import com.pocospizziback.api.config.i18n.Messages;
import com.pocospizziback.api.config.i18n.ServiceException;
import com.pocospizziback.api.domain.StatusBill;
import com.pocospizziback.api.domain.TypeBill;
import com.pocospizziback.api.dto.req.BillReqDTO;
import com.pocospizziback.api.dto.req.ReportBillReqDTO;
import com.pocospizziback.api.dto.res.BillResDTO;
import com.pocospizziback.api.model.Bill;
import com.pocospizziback.api.repository.BillRepository;
import com.pocospizziback.api.util.SearchUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BillService {

    @Autowired
    private BillRepository repository;

    public void logicalExclusion(Long id) {

        if (this.repository.findByIdAndNotDeleted(id).isEmpty())
            throw new ServiceException(Messages.use_not_found);

        this.repository.softDelete(id);
    }

    public BillResDTO findByIdDTO(Long id) {

        return BillResDTO.of(this.findById(id));
    }

    public Bill findById(Long id) {
        return this.repository.findById(id).orElseThrow(() -> new ServiceException(Messages.bill_not_found));
    }

    public PageRes<BillResDTO> findAll(PageReq query) {

        Specification<Bill> deleted = SearchUtils.specByDeleted(query.isDeleted());
        Specification<Bill> filters = SearchUtils.specByFilter(query.getFilter(), "typeBill", "id", "dueDate", "value",
                "debtor", "beneficiary", "statusBill");
        Page<Bill> page = this.repository.findAll(deleted.and(filters), query.toPageRequest());

        return new PageRes<>(page.getContent().stream().map(BillResDTO::of).collect(Collectors.toList()),
                page.getTotalElements(), page.getTotalPages());
    }

    public List<Bill> findAllBillNotIsPaid() {

        return this.repository.findByIsPaidIsFalse();
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

    public void updateStatusBillRes(BillReqDTO dto) {

        LocalDate today = LocalDate.now();

        if (dto.getIsPaid() && dto.getStatusBill() != StatusBill.PAID) {
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

        this.updateStatusBillRes(dto);
        return BillResDTO.of(this.repository.save(dto.toEntity(new Bill())));
    }

    public BillResDTO update(Long id, BillReqDTO dto) {

        this.updateStatusBillRes(dto);

        Bill bill = dto.toEntity(this.findById(id));

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
                .collect(Collectors.summingDouble(Double::intValue));

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
}
