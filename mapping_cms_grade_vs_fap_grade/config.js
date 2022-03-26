module.exports = {
    FAP_CONFIG: {
        path: "./Fap_input/IS1413_PRX301_KHANGPQ3_SPRING2022.xlsx",
        sheetName: "Sheet1",
        bonus_col: "A",
        total_bonus_col: "B",
        member_code_col: "E",
        raw_grade_col: "T",
        grade_after_bonus_col: "S",
        header_row: 1
    },
    CMS_CONFIG: {
        path: "./CMS_input/prx301-Quiz 2 SP2022 KhangPQ3-grades.xlsx",
        sheetName: "prx301 Quiz 2 SP2022 KhangPQ3",
        email_col: "C",
        grade_col: "H",
        header_row: 1,
        grade_scale: 1 // lấy điểm thực tế trên cms nhân hệ số để ra điểm thang 10 hoặc thang đo muốn hiển thị
    },
}