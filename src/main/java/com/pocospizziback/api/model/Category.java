package com.pocospizziback.api.model;


import com.pocospizziback.api.bases.BaseEntity;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "categories")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class Category extends BaseEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
}
