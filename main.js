const PDFDocument = require('pdfkit');
const fs = require('fs');

const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1;
const date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();
const toDay = `${year}-${month}-${date}`;
const width = 500;

const invoice = {
    shipping: {
        name: "John Doe",
        address: "1234 Main Str eet",
        city: "San Francisco",
        state: "CA",
        country: "US",
        postal_code: 94111
    },
    items: [
        {
            no: 1.1,
            description: "Toner Cartridge",
            revenue: 200,
            accrued_income: 6000,
            total: 6200
        },
        {
            no: 1.2,
            description: "USB Cable Extender",
            revenue: 5000,
            accrued_income: 50,
            total: 5050
        }
    ],
    subtotal: 8000,
    sum_revenue: 5200,
    sum_accrued_income: 6050,
    sum_total: 11250

};
const path = 'output.pdf'

createRevenue(invoice, path);

function createRevenue(invoice, path) {
    const doc = new PDFDocument({
        size: 'A4',
        margin: 50,
        info: {
            Title: 'ใบเสร็จรับเงิน',
            Author: 'kmochimaru',
            Keywords: 'pdf;javascript',
            CreationDate: now
        }
    });
    doc.font('fonts/THSarabunNew.ttf');
    generateHeader(doc);
    doc
        .fontSize(20)
        .text(`รายงานรายได้ (${toDay})`, 50, 100, { align: "center" })
        .moveDown();
    generateHeadTable(doc, width);
    doc.moveDown();
    generateBodyTable(doc, width);
    generateFooter(doc, width);
    doc.end();
    doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc) {
    doc
        .image("images/google_logo.png", 50, 45, { width: 50 })
        .moveDown()
        .fontSize(10)
        .text("บริษัท ซี๊ดซอฟต์ โซลูชั่น จำกัด", 50, 70)
        .moveDown()
        .fontSize(10)
        .text("199/67 ม.4 ต.ท่าศาลา อ.เมือง จ.เชียงใหม่ 50000", 50, 82)
        .moveDown()
        .fontSize(10)
        .text("เลขผู้เสียภาษี 1122334455667", 50, 94)
        .moveDown()
}

function generateHeadTable(doc, width) {
    const data = [
        ['ลำดับ', 'รายละเอียด', 'รายได้รับแล้ว', 'รายได้ค้างจ่าย', 'รวมสุทธิ (บาท)']
    ];

    const startY = doc.y - 10,
        startX = 50,
        distanceY = 15,
        distanceX = 17;

    const columnSize = [
        { distanceX: 17, width: 10 },
        { distanceX: 17, width: 45 },
        { distanceX: 17, width: 15 },
        { distanceX: 17, width: 15 },
        { distanceX: 17, width: 15 },
    ];

    doc.fontSize(12);

    let currentY = startY;

    data.forEach(value => {
        let currentX = startX;

        value.forEach((text, index) => {
            let blockSize = (width / 100) * columnSize[index].width;
            //Write text
            doc.text(text, currentX + columnSize[index].distanceX, currentY);

            //Create rectangles
            doc
                .lineJoin("miter")
                .rect(currentX, currentY, blockSize, distanceY)
                .stroke();
            // Next to column
            currentX += blockSize;
        });
        // New line
        currentY += distanceY;
    });
}

function generateBodyTable(doc, width) {
    const data = [
        [1, 2, 2, 2, 30],
        [1, 2, 2, 2, 30],
        [1, 2, 2, 2, 30],
        [1, 2, 2, 2, 5000],
    ];

    const startY = doc.y - 17,
        startX = 50,
        distanceY = 15,
        distanceX = 17;

    const columnSize = [
        { distanceX: 17, width: 10 },
        { distanceX: 17, width: 45 },
        { distanceX: 17, width: 15 },
        { distanceX: 17, width: 15 },
        { distanceX: 17, width: 15 },
    ];

    doc.fontSize(12);

    let currentY = startY;

    data.forEach(value => {
        let currentX = startX;

        value.forEach((text, index) => {
            let blockSize = (width / 100) * columnSize[index].width;
            //Write text
            doc.text(text, currentX + columnSize[index].distanceX, currentY);

            //Create rectangles
            doc
                .lineJoin("miter")
                .rect(currentX, currentY, blockSize, distanceY)
                .stroke();
            // Next to column
            currentX += blockSize;
        });
        // New line
        currentY += distanceY;
    });
}

function generateFooter(doc, width) {
    const data = [
        ['ยอดรวม (รายได้การผลิต)', 2, 2, 30],
        ['ยอดรวมทั้งหมด', 2, 2, 5000],
    ];
    const columnSize = [55, 15, 15, 15];

    const startY = doc.y,
        startX = 50,
        distanceY = 15,
        distanceX = 17;

    doc.fontSize(12);

    let currentY = startY - 1;

    data.forEach(value => {
        let currentX = startX;

        value.forEach((text, index) => {
            let blockSize = (width / 100) * columnSize[index];
            //Write text
            doc.text(text, currentX + distanceX, currentY);

            //Create rectangles
            doc
                .lineJoin("miter")
                .rect(currentX, currentY, blockSize, distanceY)
                .stroke();
            // Next to column
            currentX += blockSize;
        });
        // New line
        currentY += distanceY;
    });
}


