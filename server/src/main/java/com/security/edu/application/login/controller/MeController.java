package com.security.edu.application.login.controller;

import com.security.edu.application.login.util.JwtUtil;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api")
public class MeController {

    @GetMapping("/me")
    public Map<String, String> me(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("토큰 없음");
        }
        String token = authHeader.substring(7);
        String id = JwtUtil.getIdFromToken(token);
        return Map.of("id", id);
    }
}
