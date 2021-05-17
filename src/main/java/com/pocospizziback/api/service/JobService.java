package com.pocospizziback.api.service;

import com.pocospizziback.api.bases.PageReq;
import com.pocospizziback.api.bases.PageRes;
import com.pocospizziback.api.config.i18n.Messages;
import com.pocospizziback.api.config.i18n.ServiceException;
import com.pocospizziback.api.domain.TypeJob;
import com.pocospizziback.api.dto.req.JobReqDTO;
import com.pocospizziback.api.dto.req.ProductUsedReqDTO;
import com.pocospizziback.api.dto.res.JobResDTO;
import com.pocospizziback.api.model.*;
import com.pocospizziback.api.repository.JobRepository;
import com.pocospizziback.api.util.SearchUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobService {

    @Autowired
    private JobRepository repository;

    @Autowired
    private BillService billService;

    @Autowired
    private ClientService clientService;

    @Autowired
    private AssistanceService assistanceService;

    @Autowired
    private ProductUsedService productUsedService;

    @Autowired
    private ProductService productService;

    @Autowired
    private ConfigSystemService configSystemService;

    @Autowired
    private AssistanceUsedService assistanceUsedService;

    public List<Job> findAllJobIncomplete(){
        return this.repository.findByCompleteIsFalse();
    }

    private void deletedJobsIncomplete(){
        List<Job> jobDeletedList = this.findAllJobIncomplete();
        jobDeletedList.forEach(jobDeleted -> {
            this.productService.updateStory(jobDeleted.getProductsUsed());
            this.repository.deleteById(jobDeleted.getId());
        });
    }

//    1 step
    @Transactional
    public JobResDTO saveClientJob(Long idClient, TypeJob typeJob){

        Client client = clientService.findById(idClient);

        Job job = new Job();
        job.setClient(client);
        job.setNameClient(client.getNameClient());
        job.setTypeJob(typeJob);
        job.setValueTotalJob(0D);
        job.setValueTotalPerforatedMeters(0D);
        job.setValueTotalMechanicalGeoCoatingMeters(0D);
        job.setValueTotalAssistance(0D);
        job.setValueTotalProduct(0D);
        job.setDownPayment(0D);
        job.setMechanicalGeoCoatingMeters(0);
        job.setPerforatedMeters(0);
        job.setTotalParcel(0);
        job.setComplete(false);
        job.setParcelPeriod(ParcelPeriod.MONTH);
        job.setDateStartParcel(LocalDate.now().plusMonths(1));
        job.setTotalParcel(10);

        this.deletedJobsIncomplete();

        return JobResDTO.of(this.repository.save(job));
    }

    //    2 step
    @Transactional
    public JobResDTO saveGeneralMaintenanceInJob(Long idJob, JobReqDTO dto){
        Job job = this.findByIdEntity(idJob);

        if(dto.getDateJob().isAfter(LocalDate.now())){
            throw new ServiceException(Messages.date_service_invalid);
        }

        job.setDateJob(dto.getDateJob());
        job.setDescription(dto.getDescription());
        job.setObservation(dto.getObservation());

        return JobResDTO.of(this.repository.save(job));
    }

//    2 step
    @Transactional
    public JobResDTO saveGeneralInJob(Long idJob, JobReqDTO dto){
        Job job = this.findByIdEntity(idJob);

        if(dto.getDateJob().isAfter(LocalDate.now())){
            throw new ServiceException(Messages.date_service_invalid);
        }

        if(dto.getPerforatedMeters() == null || dto.getPerforatedMeters() < 0){
            throw new ServiceException(Messages.perforated_meters_invalid);
        }

        if(dto.getMechanicalGeoCoatingMeters() == null || dto.getMechanicalGeoCoatingMeters() < 0){
            throw new ServiceException(Messages.mechanical_geo_coating_meters_invalid);
        }

        job.setPerforatedMeters(dto.getPerforatedMeters());
        job.setMechanicalGeoCoatingMeters(dto.getMechanicalGeoCoatingMeters());
        job.setValueTotalPerforatedMeters(this.configSystemService.calcTotalValueMetersPerforation(dto.getPerforatedMeters()));
        job.setValueTotalMechanicalGeoCoatingMeters(this.configSystemService.calcTotalValueMechanicalGeoCoatingMeters(dto.getMechanicalGeoCoatingMeters()));
        job.setValueTotalJob(job.getValueTotalJob()+job.getValueTotalMechanicalGeoCoatingMeters()+job.getValueTotalPerforatedMeters());
        job.setDateJob(dto.getDateJob());
        job.setDescription(dto.getDescription());
        job.setObservation(dto.getObservation());
        job.setValueMeterPerforation(this.configSystemService.valueMeterPerforation(dto.getPerforatedMeters()));

        return JobResDTO.of(this.repository.save(job));
    }

//    3 step
    @Transactional
    public JobResDTO saveListProductUsedInJob(Long idJob, List<ProductUsedReqDTO> productTempList){

        Job job = this.findByIdEntity(idJob);

        if(productTempList != null && productTempList.isEmpty() == false){
            List<ProductUsed> productUsedList = this.productUsedService.saveList(productTempList);

            Double valueTotalProduct = this.productUsedService.sumValueListProduct(productUsedList);

            job.setProductsUsed(productUsedList);
            job.setValueTotalProduct(valueTotalProduct);
            job.setValueTotalJob(job.getValueTotalJob()+valueTotalProduct);

            this.repository.save(job);
        }

        return JobResDTO.of(job);
    }

//    4 step
    @Transactional
    public JobResDTO saveListAssistanceInJob(Long idJob, List<Long> assistanceResDTOList){

        Job job = this.findByIdEntity(idJob);

        if(assistanceResDTOList != null && assistanceResDTOList.isEmpty() == false){

            List<AssistanceUsed> assistanceUsedList = this.assistanceUsedService.saveList(assistanceResDTOList);

            List<Assistance> assistanceList = this.assistanceService.saveList(assistanceResDTOList);

            Double totalValueAssistance = this.assistanceService.sumValueTotalAssistance(assistanceList);

            job.setValueTotalAssistance(totalValueAssistance);
            job.setValueTotalJob(job.getValueTotalJob()+totalValueAssistance);
            job.setAssistanceUsed(assistanceUsedList);

           this.repository.save(job);
        }

        return JobResDTO.of(job);
    }

//    5 step
    @Transactional
    public JobResDTO saveTotalInJob(Long idJob, JobReqDTO dto){

        this.validDTO(dto);

        Job job = this.findByIdEntity(idJob);

        List<Bill> bills = this.billService.createBillsByJob(
                job.getClient(),
                dto.getDateStartParcel(),
                dto.getTotalParcel(),
                dto.getValueTotalJob(),
                dto.getDownPayment(),
                dto.getParcelPeriod());

        job.setBills(bills);
        job.setParcelPeriod(dto.getParcelPeriod());
        job.setDateStartParcel(dto.getDateStartParcel());
        job.setTotalParcel(dto.getTotalParcel());
        job.setDownPayment(dto.getDownPayment());
        job.setValueTotalJob(dto.getValueTotalJob());
        job.setComplete(true);

        return JobResDTO.of(this.repository.save(job));
    }

    public void validDTO(JobReqDTO dto){

        if(dto.getTotalParcel() == 0D && dto.getDownPayment() < dto.getValueTotalJob()){
            throw new ServiceException(Messages.total_parcel_invalid);
        }

        if(dto.getDownPayment() > dto.getValueTotalJob()){
            throw new ServiceException(Messages.value_down_up_total);
        }

        if(dto.getTotalParcel() < 0){
            throw new ServiceException(Messages.total_parcel_negative);
        }

        if(dto.getDateJob().isAfter(LocalDate.now())){
            throw new ServiceException(Messages.date_service_invalid);
        }

        if(dto.getDateStartParcel().isBefore(LocalDate.now())){
            throw new ServiceException(Messages.date_start_parcel_invalid);
        }
    }

    @Transactional
    public PageRes<JobResDTO> findAll(PageReq query, TypeJob typeJob) {

        this.deletedJobsIncomplete();

        Specification<Job> deleted = SearchUtils.specByDeleted(query.isDeleted());
        Specification<Job> specTypeJob = SearchUtils.specByTypeJob(typeJob);
        Specification<Job> filters = SearchUtils.specByFilter(query.getFilter(), "id", "description", "typeJob",
                "observation", "valueTotalJob", "dateJob", "perforatedMeters", "mechanicalGeoCoatingMeters");
        Page<Job> page = this.repository.findAll(deleted.and(filters).and(specTypeJob), query.toPageRequest());

        return new PageRes<>(page.getContent().stream().map(JobResDTO::of).collect(Collectors.toList()),
                page.getTotalElements(), page.getTotalPages());
    }

    @Transactional
    public JobResDTO findByIdDTO(Long id) {
        return JobResDTO.of(this.findByIdEntity(id));
    }

    @Transactional
    public Job findByIdEntity(Long id) {
        return this.repository.findById(id).orElseThrow(() -> new ServiceException(Messages.job_not_found));
    }

    @Transactional
    public void logicalExclusion(Long id) {

        if (this.repository.findByIdAndNotDeleted(id).isEmpty())
            throw new ServiceException(Messages.job_not_found);

        Job job = this.findByIdEntity(id);

        this.billService.logicalExclusionList(job.getBills());

        this.repository.softDelete(id);

        this.productService.updateStory(job.getProductsUsed());
    }

    @Transactional
    public JobResDTO update(Long id, JobReqDTO dto){
        Job job = this.findByIdEntity(id);

        job.setDescription(dto.getDescription());
        job.setObservation(dto.getObservation());
        job.setValueTotalJob(dto.getValueTotalJob());
        job.setPerforatedMeters(dto.getPerforatedMeters());
        job.setMechanicalGeoCoatingMeters(dto.getMechanicalGeoCoatingMeters());
        job.setDateJob(dto.getDateJob());

        return JobResDTO.of(job);

    }
}
