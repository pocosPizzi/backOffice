package com.pocospizziback.api.model;

import com.pocospizziback.api.bases.BaseEntity;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "config_system")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class ConfigSystem extends BaseEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double value0To100PerforatedMeters;

    private Double value100To150PerforatedMeters;

    private Double value150To200PerforatedMeters;

    private Double value200To250PerforatedMeters;

    private Double value250To300PerforatedMeters;

    private Double valueMechanicalGeoCoatingMeters;

}
