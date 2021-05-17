package com.pocospizziback.api;

import com.pocospizziback.api.domain.Role;
import com.pocospizziback.api.model.ConfigSystem;
import com.pocospizziback.api.model.User;
import com.pocospizziback.api.repository.UserRepository;
import com.pocospizziback.api.service.BillService;
import com.pocospizziback.api.service.ConfigSystemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.HashSet;

@Component
public class ApplicationStartup implements ApplicationListener<ApplicationReadyEvent> {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private BillService billService;

    @Autowired
    private ConfigSystemService configSystemService;

    @Override
    public void onApplicationEvent(final ApplicationReadyEvent event) {
        this.initApplication();
    }

    private void initApplication() {

        if (!this.userRepository.existsById(1L)) {
            HashSet<Role> roles = new HashSet<>(Arrays.asList(Role.ADMIN));
            this.userRepository.save(
                    User.builder().username("admin").name("Administrador do Sistema").password(this.passwordEncoder.encode("1234")).roles(roles).build());

        }

        this.billService.updateAllStatusBill();

        this.initConfigSystem();
    }

    private void initConfigSystem(){
        if(this.configSystemService.verifyBaseIsEmpty())
            this.configSystemService.save(ConfigSystem.builder()
                    .valueMechanicalGeoCoatingMeters(10D)
                    .value0To100PerforatedMeters(10D)
                    .value100To150PerforatedMeters(20D)
                    .value150To200PerforatedMeters(30D)
                    .value200To250PerforatedMeters(40D)
                    .value250To300PerforatedMeters(50D)
                    .build());

    }
}
