const cf = require('./config');
const excelToJson = require('convert-excel-to-json');
const ExcelJS = require('exceljs');
const path = require('path');
let outputFilePath = cf.saveBackToInput ? cf.FAP_CONFIG.path : path.join('./Output', path.basename(cf.FAP_CONFIG.path));

function sum(arr) {
    let ret = 0;
    arr.map(v => {
        ret += v
    });
    return isNaN(ret) ? 0 : ret;
}

function getGradeAfterBonus(rawGrade, totalBonus) {
    let ret = {
        gradeWithBonus: rawGrade,
        remainBonus: totalBonus
    };
    let bonusToGetTen = 10 - rawGrade;
    let usedBonus = bonusToGetTen > totalBonus ? totalBonus : bonusToGetTen;
    ret.gradeWithBonus = rawGrade + usedBonus;
    ret.remainBonus = +(totalBonus - usedBonus).toPrecision(3);
    return ret;
}

async function run() {
    //**Read Data from CMS_EXPORT AND FAP_EXPORT */
    let FAP_DATA = excelToJson({
        sourceFile: cf.FAP_CONFIG.path
    })[cf.FAP_CONFIG.sheetName];
    let CMS_DATA = excelToJson({
        sourceFile: cf.CMS_CONFIG.path
    })[cf.CMS_CONFIG.sheetName];

    var workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(cf.FAP_CONFIG.path);
    var worksheet = workbook.getWorksheet(cf.FAP_CONFIG.sheetName);

    //**Mapping_FAP_DATA_VS_CMS_DATA_BY_STUDENT_CODE */
    for (let i = cf.FAP_CONFIG.header_row; i < FAP_DATA.length; i++) {
        let data = FAP_DATA[i];
        let studentCode = ("" + data[cf.FAP_CONFIG.member_code_col]).toLowerCase();
        for (let j = cf.CMS_CONFIG.header_row; j < CMS_DATA.length; j++) {
            const cmsdata = CMS_DATA[j]
            let studentEmail = ("" + cmsdata[cf.CMS_CONFIG.email_col]).toLowerCase()
            if (studentCode == studentEmail.split("@")[0]) {
                data[cf.FAP_CONFIG.raw_grade_col] = (+cmsdata[cf.CMS_CONFIG.grade_col]) * cf.CMS_CONFIG.grade_scale;
                break;
            }
        }
        //**Calculate bonus */
        data.bonus1 = sum(("" + data[cf.FAP_CONFIG.bonus_col]).split(" ").map(v => +v))
        data.bonus2 = sum(("" + data[cf.FAP_CONFIG.total_bonus_col]).split(" ").map(v => +v))
        data.totalBonus = data.bonus1 + data.bonus2


        //**Calculate grade after bonus*/
        let gradeAfterBonus = getGradeAfterBonus(data[cf.FAP_CONFIG.raw_grade_col], data.totalBonus);
        data[cf.FAP_CONFIG.grade_after_bonus_col] = gradeAfterBonus.gradeWithBonus;
        data.remainBonus = gradeAfterBonus.remainBonus;

        //** write data to excel*/
        var rowUpdate = worksheet.getRow(i + 1);
        if (i === 1) {
            console.log({
                val: rowUpdate.getCell(cf.FAP_CONFIG.grade_after_bonus_col).value
            })
        }
        if (!["", NaN, null].includes(rowUpdate.getCell(cf.FAP_CONFIG.grade_after_bonus_col).value) ||
            !["", NaN, null].includes(rowUpdate.getCell(cf.FAP_CONFIG.raw_grade_col).value)) {
            throw new Error("Grade col already have data!");
        }

        rowUpdate.getCell(cf.FAP_CONFIG.grade_after_bonus_col).value = gradeAfterBonus.gradeWithBonus;
        rowUpdate.getCell(cf.FAP_CONFIG.raw_grade_col).value = data[cf.FAP_CONFIG.raw_grade_col];
        rowUpdate.getCell(cf.FAP_CONFIG.bonus_col).value = "";
        rowUpdate.getCell(cf.FAP_CONFIG.total_bonus_col).value = data.remainBonus;

        rowUpdate.commit()
        // console.log(data);
    }
    await workbook.xlsx.writeFile(outputFilePath);
    return outputFilePath;
}

run().then(console.log).catch(console.error);