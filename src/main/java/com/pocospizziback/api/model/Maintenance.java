package com.pocospizziback.api.model;

import com.pocospizziback.api.bases.BaseEntity;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "maintenance")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class Maintenance extends BaseEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nameClient;

    private String cpf;

    private String rg;

    private LocalDate birthday;

    private String phone;

    private String email;

    private String numberHouse;

    private String street;

    private String district;

    private String city;

    private String uf;

    private String description;

    private String observation;

    private Double valueService;

    private LocalDate dateMaintenance;

    @ManyToMany(fetch = FetchType.EAGER)
    private List<ProductUsed> productsUsed;
}

