package com.pocospizziback.api.model;

import com.pocospizziback.api.bases.BaseEntity;
import com.pocospizziback.api.domain.TypeService;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "services_provided")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class JobProvided extends BaseEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String client;

    private String numberHouse;

    private String street;

    private String district;

    private String city;

    private String uf;

    private String description;

    private TypeService typeService;

    private Integer perforatedMeters;

    private String observation;

    private Double valueService;

    @ManyToMany
    private List<JobProduct> jobProducts;
}
