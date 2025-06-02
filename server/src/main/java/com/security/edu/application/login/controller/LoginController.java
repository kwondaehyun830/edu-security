package com.security.edu.application.login.controller;

import com.security.edu.application.login.util.JwtUtil;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api")
public class LoginController {

    // 예시: 인메모리 유저 정보
    private final Map<String, String> userStore = Map.of(
            "test", "9C56CC51A92B849B13FBB6B2F50C5E6B669FE0D2E94C96AD1A8D0E65EA3A82BD"
            // (test/1234의 SHA-256 해시, 대문자)
    );

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");
        String stored = userStore.get(username);
        if (stored != null && stored.equals(password)) {
            String token = JwtUtil.generateToken(username);
            return Map.of("message", "로그인 성공", "token", token);
        }
        return Map.of("message", "로그인 실패");
    }
}
