package com.pocospizziback.api.dto.req;

import com.pocospizziback.api.domain.TypeTotalStock;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductTempReqDTO {

    private Long id;

    private String name;

    private TypeTotalStock typeTotalStock;

    private Integer total;
}
