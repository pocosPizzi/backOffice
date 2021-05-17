package com.pocospizziback.api.model;

import com.pocospizziback.api.bases.BaseEntity;
import com.pocospizziback.api.domain.TypeJob;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "jobs")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class Job extends BaseEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    private String observation;

    private Double valueTotalPerforatedMeters;

    private Double valueTotalMechanicalGeoCoatingMeters;

    private Double valueTotalJob;

    private Double valueTotalProduct;

    private Double valueTotalAssistance;

    private Integer perforatedMeters;

    private Integer mechanicalGeoCoatingMeters;

    private LocalDate dateJob;

    private TypeJob typeJob;

    private Integer totalParcel;

    private LocalDate dateStartParcel;

    private ParcelPeriod parcelPeriod;

    private Double downPayment;

    private String nameClient;

    private Boolean complete;

    private Double valueMeterPerforation;

    @ManyToOne
    private Client client;

    @ManyToMany
    private List<ProductUsed> productsUsed;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "assistance_id", referencedColumnName = "id")
    @OrderBy(value="id")
    private List<Bill> bills;

    @ManyToMany
    private List<AssistanceUsed> assistanceUsed;

}
