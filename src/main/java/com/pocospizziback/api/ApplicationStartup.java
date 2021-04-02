package com.pocospizziback.api;

import java.util.Arrays;
import java.util.HashSet;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.pocospizziback.api.domain.Role;
import com.pocospizziback.api.model.User;
import com.pocospizziback.api.repository.UserRepository;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class ApplicationStartup implements ApplicationListener<ApplicationReadyEvent> {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	@Override
	public void onApplicationEvent(final ApplicationReadyEvent event) {
		this.initDatabase();
	}

	private void initDatabase() {
		if (!this.userRepository.existsById(1L)) {
			HashSet<Role> roles = new HashSet<>(Arrays.asList(Role.ADMIN));
			this.userRepository.save(
					User.builder().username("admin").name("Administrador do Sistema").password(this.passwordEncoder.encode("1234")).roles(roles).build());

		}
	}
}
