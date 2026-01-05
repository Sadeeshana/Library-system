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

    //This function for deleting member
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteMember(@PathVariable int id) {
        try {
            if (memberRepository.existsById(id)) {
                memberRepository.deleteById(id);

                return ResponseEntity.ok("Member deleted successfully!");
            } else {
                return ResponseEntity.notFound().build();
            }
        }catch (Exception e) {
            return ResponseEntity.status(500)
                    .body("You can't delete this member. They have books to return");
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateMember(@PathVariable int id, @RequestBody Member updatedMember) {
        Optional<Member> optionalMember = memberRepository.findById(id);

        if(optionalMember.isPresent()){
            Member member = optionalMember.get();

            //Update
            member.setMemberName(updatedMember.getMemberName());
            member.setMemberEmail(updatedMember.getMemberEmail());
            member.setMemberPhoneNumber(updatedMember.getMemberPhoneNumber());
            member.setMemberStatus(updatedMember.getMemberStatus());

            memberRepository.save(member);
            return ResponseEntity.ok("Member updated successfully!");
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
