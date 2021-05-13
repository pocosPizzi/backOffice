package com.pocospizziback.api.util;

import java.text.DecimalFormat;

public class FormatDouble2 {

    public static Double format(Double value){

       DecimalFormat form = new DecimalFormat("#.##");
        Double newValue = Double.valueOf(form.format(value));

        return newValue;
    }
}
