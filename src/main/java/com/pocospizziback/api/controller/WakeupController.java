package com.pocospizziback.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/wakeup")
public class WakeupController {

    @GetMapping
    public String wakeup() {
        return "I woke up";
    }
}
