package com.pocospizziback.api.dto.req;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReportBillReqDTO {

    private String totalTypeBillPay;

    private String totalTypeBillReceive;

    private String totalInLateTypeBillPay;

    private String totalInLateTypeBillReceive;

    private String totalPaidTypeBillPay;

    private String totalPaidTypeBillReceive;

    private String totalReceivable;

    private String totalPayable;

    private String totalLiquid;

}
