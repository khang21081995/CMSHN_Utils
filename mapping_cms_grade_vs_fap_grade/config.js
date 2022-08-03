module.exports = {
    FAP_CONFIG: {
        path: "C:\\Users\\khang\\Downloads\\PRF\\PRF192.M5_PRF192_KHANGPQ3_SUMMER2022.xlsx",
        sheetName: "Sheet1",
        bonus_col: "A",
        total_bonus_col: "B",
        member_code_col: "E",
        raw_grade_col: "AE",
        grade_after_bonus_col: "AF",
        header_row: 1,
        bonus_scale: 5/1.3 // ví dụ: điểm bonus lấy đầu điểm 5% là gốc, đang tính điểm đầu 10% thì bonus scale là 0.5
    },
    CMS_CONFIG: {
        path: "C:\\Users\\khang\\Downloads\\CMS_EXPORT\\PE_PRF192_Trial_666879_old.xlsx",
        sheetName: "Result",
        email_col: "B",
        grade_col: "F",
        header_row: 1,
        grade_scale: 1 // lấy điểm thực tế trên cms nhân hệ số để ra điểm thang 10 hoặc thang đo muốn hiển thị
    },

    saveBackToInput: true
}
