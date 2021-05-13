package com.pocospizziback.api.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ParcelPeriod {

    WEEK(1),
    FORTNIGHT(2),
    MONTH(3);

    private Integer description;
}
