package com.example.Library.system;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController

@RequestMapping("/api/members")

public class MemberController {
    @Autowired
    private MemberRepository memberRepository;

    @GetMapping("/total")
    public long getTotalMembers(){
        return memberRepository.count();
    }
}
