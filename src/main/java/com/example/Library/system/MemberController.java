package com.example.Library.system;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import java.util.Optional;

import java.util.List;


@RestController

@RequestMapping("/api/members")

public class MemberController {
    @Autowired
    private MemberRepository memberRepository;

    @GetMapping("/total")
    public long getTotalMembers(){
        return memberRepository.count();
    }

    @GetMapping("/all")
    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }
    @GetMapping("/active-count")
    public long getActiveMembersCount() {
        return memberRepository.countByMemberStatus("Active");
    }

    @PostMapping("/add")
    public Member addMember(@RequestBody Member member) {
        return memberRepository.save(member);
    }


}
