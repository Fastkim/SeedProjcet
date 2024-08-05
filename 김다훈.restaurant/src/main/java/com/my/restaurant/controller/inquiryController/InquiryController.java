package com.my.restaurant.controller.inquiryController;

import com.my.restaurant.domain.dto.inquiryDto.InquiryDto;
import com.my.restaurant.service.inquiryService.InquiryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/inquiries")
public class InquiryController {
    @Autowired
    private InquiryService inquiryService;

    @GetMapping
    public List<InquiryDto> getAllInquiries() {
        return inquiryService.getAllInquiries();
    }

    @GetMapping("/{id}")
    public InquiryDto getInquiryById(@PathVariable Long id) {
        return inquiryService.getInquiryById(id);
    }

    @PostMapping
    public InquiryDto addInquiry(@RequestBody InquiryDto inquiryDto) {
        return inquiryService.addInquiry(inquiryDto);
    }

    @PutMapping("/{id}")
    public InquiryDto updateInquiry(@PathVariable Long id, @RequestBody InquiryDto inquiryDto) {
        return inquiryService.updateInquiry(id, inquiryDto);
    }

    @DeleteMapping("/{id}")
    public void deleteInquiry(@PathVariable Long id) {
        inquiryService.deleteInquiry(id);
    }
}

