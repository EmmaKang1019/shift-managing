package com.example.shift.shift.service;

import com.example.shift.employee.domain.Employee;
import com.example.shift.employee.repository.EmployeeRepository;
import com.example.shift.exception.BusinessException;
import com.example.shift.shift.domain.Shift;
import com.example.shift.shift.dto.ShiftCreateRequest;
import com.example.shift.shift.dto.ShiftResponse;
import com.example.shift.shift.repository.ShiftRepository;
import java.time.LocalDate;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class ShiftService {

    private final ShiftRepository shiftRepository;
    private final EmployeeRepository employeeRepository;

    public ShiftService(ShiftRepository shiftRepository, EmployeeRepository employeeRepository) {
        this.shiftRepository = shiftRepository;
        this.employeeRepository = employeeRepository;
    }

    @Transactional
    public ShiftResponse createShift(ShiftCreateRequest request) {
        if (!request.startTime().isBefore(request.endTime())) {
            throw new BusinessException("시작 시간은 종료 시간보다 빨라야 합니다.");
        }

        Employee employee = employeeRepository.findById(request.employeeId())
                .orElseThrow(() -> new BusinessException("직원을 찾을 수 없습니다."));

        boolean overlaps = !shiftRepository.findOverlaps(
                request.employeeId(), request.workDate(), request.startTime(), request.endTime()).isEmpty();

        if (overlaps) {
            throw new BusinessException("같은 날짜에 시간이 겹치는 쉬프트가 이미 존재합니다.");
        }

        Shift shift = new Shift(employee, request.workDate(), request.startTime(), request.endTime(), request.memo());
        Shift saved = shiftRepository.save(shift);
        return toResponse(saved);
    }

    public List<ShiftResponse> getShifts(LocalDate from, LocalDate to, Long employeeId) {
        List<Shift> shifts = employeeId == null
                ? shiftRepository.findByWorkDateBetweenOrderByWorkDateAscStartTimeAsc(from, to)
                : shiftRepository.findByEmployeeIdAndWorkDateBetweenOrderByWorkDateAscStartTimeAsc(employeeId, from, to);

        return shifts.stream().map(this::toResponse).toList();
    }

    private ShiftResponse toResponse(Shift shift) {
        return new ShiftResponse(
                shift.getId(),
                shift.getEmployee().getId(),
                shift.getEmployee().getName(),
                shift.getWorkDate(),
                shift.getStartTime(),
                shift.getEndTime(),
                shift.getMemo());
    }
}
