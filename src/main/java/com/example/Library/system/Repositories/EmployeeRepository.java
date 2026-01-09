package com.example.Library.system.Repositories;

import com.example.Library.system.Entities.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee,Integer> {

    Employee findByUsername(String username);
    Employee findByEmail(String email);

}

