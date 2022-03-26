module.exports = {
    FAP_CONFIG: {
        path: "./Fap_input/IS1413_PRX301_KHANGPQ3_SPRING2022.xlsx",
        sheetName: "Sheet1",
        bonus_col: "A",
        total_bonus_col: "B",
        member_code_col: "E",
        raw_grade_col: "L",
        grade_after_bonus_col: "K",
        header_row: 1
    },
    CMS_CONFIG: {
        path: "./CMS_input/prx_ass1.xlsx",
        sheetName: "SHEET 1",
        email_col: "A",
        grade_col: "B",
        header_row: 1,
        grade_scale: 0.1 // lấy điểm thực tế trên cms nhân hệ số để ra điểm thang 10 hoặc thang đo muốn hiển thị
    },
    saveBackToInput: false
}