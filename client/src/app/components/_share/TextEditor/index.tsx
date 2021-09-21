import React, { useState } from "react";
import Editor from "./Editor/Editor";
import "./style.scss";
interface Props {
  placeholder: string;
  showHeader?: boolean;
  preElement?: any;
}
const TextEditor: React.FC<Props> = (props) => {
  const [document, setDocument] = useState(ExampleDocument);
  return (
    <div className="text-editor">
      <div className="main-editor">
        <Editor document={document} onChange={setDocument} {...props} />
      </div>
    </div>
  );
};

export default TextEditor;
const ExampleDocument = [
  {
    children: [
      {
        text: "TÀI LIỆU MÔ TẢ",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "HEADING_1",
    type: "paragraph",
    startIndex: 1,
    endIndex: 16,
  },
  {
    children: [
      {
        text: "Mark the letter ",
        italic: false,
        bold: false,
        underline: false,
      },
      {
        children: [
          {
            text: "",
            italic: false,
            bold: false,
            underline: false,
          },
        ],
        type: "katex",
        content: "$\\mathrm{A}, \\mathrm{B}, \\mathrm{C}$",
      },
      {
        text: " or ",
        italic: false,
        bold: false,
        underline: false,
      },
      {
        children: [
          {
            text: "",
            italic: false,
            bold: false,
            underline: false,
          },
        ],
        type: "katex",
        content: "$\\mathrm{D}$",
      },
      {
        text: " on your answer sheet to indicate the word whose underlined part differs from the other three in pronunciation in each of the following questions.",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "HEADING_2",
    type: "paragraph",
    startIndex: 16,
    endIndex: 231,
  },
  {
    children: [
      {
        text: "Question 1:",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "HEADING_4",
    type: "paragraph",
    startIndex: 231,
    endIndex: 243,
  },
  {
    children: [
      {
        text: "",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 243,
    endIndex: 244,
  },
  {
    children: [
      {
        type: "table_row",
        children: [
          {
            type: "table_cell",
            children: [
              {
                children: [
                  {
                    text: "",
                    italic: false,
                    bold: false,
                    underline: false,
                  },
                ],
                align: "START",
                nameStyle: "NORMAL_TEXT",
                type: "paragraph",
                startIndex: 247,
                endIndex: 248,
              },
            ],
            columnSpan: 1,
            rowSpan: 1,
          },
          {
            type: "table_cell",
            children: [
              {
                children: [
                  {
                    text: "Hà Nội",
                    italic: false,
                    bold: false,
                    underline: false,
                  },
                ],
                align: "START",
                nameStyle: "NORMAL_TEXT",
                type: "paragraph",
                startIndex: 249,
                endIndex: 256,
              },
            ],
            columnSpan: 1,
            rowSpan: 1,
          },
          {
            type: "table_cell",
            children: [
              {
                children: [
                  {
                    text: "Thái Bình",
                    italic: false,
                    bold: false,
                    underline: false,
                  },
                ],
                align: "START",
                nameStyle: "NORMAL_TEXT",
                type: "paragraph",
                startIndex: 257,
                endIndex: 267,
              },
            ],
            columnSpan: 1,
            rowSpan: 1,
          },
        ],
      },
      {
        type: "table_row",
        children: [
          {
            type: "table_cell",
            children: [
              {
                children: [
                  {
                    text: "Số liệu thống kê",
                    italic: false,
                    bold: false,
                    underline: false,
                  },
                ],
                align: "START",
                nameStyle: "NORMAL_TEXT",
                type: "paragraph",
                startIndex: 269,
                endIndex: 286,
              },
            ],
            columnSpan: 1,
            rowSpan: 2,
          },
          {
            type: "table_cell",
            children: [
              {
                children: [
                  {
                    text: "",
                    italic: false,
                    bold: false,
                    underline: false,
                  },
                ],
                align: "START",
                nameStyle: "NORMAL_TEXT",
                type: "paragraph",
                startIndex: 287,
                endIndex: 288,
              },
            ],
            columnSpan: 1,
            rowSpan: 1,
          },
          {
            type: "table_cell",
            children: [
              {
                children: [
                  {
                    text: "",
                    italic: false,
                    bold: false,
                    underline: false,
                  },
                ],
                align: "START",
                nameStyle: "NORMAL_TEXT",
                type: "paragraph",
                startIndex: 289,
                endIndex: 290,
              },
            ],
            columnSpan: 1,
            rowSpan: 1,
          },
        ],
      },
      {
        type: "table_row",
        children: [
          {
            type: "table_cell",
            children: [
              {
                children: [
                  {
                    text: "Doanh số",
                    italic: false,
                    bold: false,
                    underline: false,
                  },
                ],
                align: "START",
                nameStyle: "NORMAL_TEXT",
                type: "paragraph",
                startIndex: 294,
                endIndex: 303,
              },
            ],
            columnSpan: 2,
            rowSpan: 1,
          },
        ],
      },
    ],
    nameStyle: null,
    type: "table",
    startIndex: 244,
    endIndex: 306,
  },
  {
    children: [
      {
        text: "",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 306,
    endIndex: 307,
  },
  {
    children: [
      {
        text: "A. glove",
        italic: false,
        bold: false,
        underline: false,
      },
      {
        text: "s",
        italic: false,
        bold: false,
        underline: true,
      },
    ],
    align: null,
    nameStyle: "HEADING_5",
    type: "paragraph",
    startIndex: 307,
    endIndex: 317,
  },
  {
    children: [
      {
        text: "B. say",
        italic: false,
        bold: false,
        underline: false,
      },
      {
        text: "s",
        italic: false,
        bold: false,
        underline: true,
      },
      {
        text: "",
        italic: false,
        bold: false,
        underline: true,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 317,
    endIndex: 325,
  },
  {
    children: [
      {
        text: "C. month",
        italic: false,
        bold: false,
        underline: false,
      },
      {
        text: "s",
        italic: false,
        bold: false,
        underline: true,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 325,
    endIndex: 335,
  },
  {
    children: [
      {
        text: "D. sing",
        italic: false,
        bold: false,
        underline: false,
      },
      {
        text: "s",
        italic: false,
        bold: false,
        underline: true,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 335,
    endIndex: 344,
  },
  {
    children: [
      {
        text: "===",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "SUBTITLE",
    type: "paragraph",
    startIndex: 344,
    endIndex: 348,
  },
  {
    children: [
      {
        text: "Giải thích : ",
        italic: false,
        bold: false,
        underline: false,
      },
      {
        text: "Đáp án A",
        italic: false,
        bold: true,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 348,
    endIndex: 370,
  },
  {
    children: [
      {
        text: "Question 2:",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "HEADING_4",
    type: "paragraph",
    startIndex: 370,
    endIndex: 382,
  },
  {
    children: [
      {
        text: "A. s",
        italic: false,
        bold: false,
        underline: false,
      },
      {
        text: "u",
        italic: false,
        bold: false,
        underline: true,
      },
      {
        text: "mmit",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "HEADING_5",
    type: "paragraph",
    startIndex: 382,
    endIndex: 392,
  },
  {
    children: [
      {
        text: "B. vol",
        italic: false,
        bold: false,
        underline: false,
      },
      {
        text: "u",
        italic: false,
        bold: false,
        underline: true,
      },
      {
        text: "ntary",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 392,
    endIndex: 405,
  },
  {
    children: [
      {
        text: "C. comp",
        italic: false,
        bold: false,
        underline: false,
      },
      {
        text: "u",
        italic: false,
        bold: false,
        underline: true,
      },
      {
        text: "lsory",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 405,
    endIndex: 419,
  },
  {
    children: [
      {
        text: "D.",
        italic: false,
        bold: false,
        underline: false,
      },
      {
        text: " ",
        italic: true,
        bold: false,
        underline: false,
      },
      {
        text: "u",
        italic: true,
        bold: false,
        underline: true,
      },
      {
        text: "pgrade",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 419,
    endIndex: 430,
  },
  {
    children: [
      {
        text: "===",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "SUBTITLE",
    type: "paragraph",
    startIndex: 430,
    endIndex: 434,
  },
  {
    children: [
      {
        text: "Giải thích : Đáp án A",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 434,
    endIndex: 456,
  },
  {
    children: [
      {
        text: "Mark the letter A, B, C or D on your answer sheet to indicate the word that differs from the other three in the position of primary stress in each of the following questions.",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "HEADING_2",
    type: "paragraph",
    startIndex: 456,
    endIndex: 631,
  },
  {
    children: [
      {
        text: "Question 3:",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "HEADING_4",
    type: "paragraph",
    startIndex: 631,
    endIndex: 643,
  },
  {
    children: [
      {
        text: "A. enginee",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 643,
    endIndex: 655,
  },
  {
    children: [
      {
        text: "B. understand",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 655,
    endIndex: 669,
  },
  {
    children: [
      {
        text: "C. referee",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 669,
    endIndex: 680,
  },
  {
    children: [
      {
        text: "D. mechanic",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 680,
    endIndex: 692,
  },
  {
    children: [
      {
        text: "===",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "SUBTITLE",
    type: "paragraph",
    startIndex: 692,
    endIndex: 696,
  },
  {
    children: [
      {
        text: "Giải thích : Đáp án A",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 696,
    endIndex: 718,
  },
  {
    children: [
      {
        text: "Question 4:",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "HEADING_4",
    type: "paragraph",
    startIndex: 718,
    endIndex: 730,
  },
  {
    children: [
      {
        text: "A. oceanic",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 730,
    endIndex: 741,
  },
  {
    children: [
      {
        text: "B. environment",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 741,
    endIndex: 756,
  },
  {
    children: [
      {
        text: "C. reality",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 756,
    endIndex: 767,
  },
  {
    children: [
      {
        text: "D. psychologist",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 767,
    endIndex: 783,
  },
  {
    children: [
      {
        text: "===",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "SUBTITLE",
    type: "paragraph",
    startIndex: 783,
    endIndex: 787,
  },
  {
    children: [
      {
        text: "Giải thích : Đáp án A",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 787,
    endIndex: 809,
  },
  {
    children: [
      {
        text: "",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 809,
    endIndex: 810,
  },
  {
    children: [
      {
        text: "Read the following passage and blacken the letter A, B, C, or D on your answer sheet to indicate the correct answer to the following questions.",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "HEADING_2",
    type: "paragraph",
    startIndex: 810,
    endIndex: 954,
  },
  {
    children: [
      {
        text: "The green building movement, started in the 1970s as a way to reduce environmental destruction, is changing the way buildings are constructed. In the early years, green builders were a small minority, and their goals of reducing the environmental impact of buildings were considered unrealistic. Now, however, the movement is growing, as builders have been able to take advantage of new technology.",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: "JUSTIFY",
    nameStyle: "HEADING_3",
    type: "paragraph",
    startIndex: 954,
    endIndex: 1353,
  },
  {
    children: [
      {
        text: "Câu 8: According to the passage, which of the following statements about green buildings is TRUE?",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "HEADING_4",
    type: "paragraph",
    startIndex: 1353,
    endIndex: 1451,
  },
  {
    children: [
      {
        text: "A. They are environmentally responsible constructions with gardens",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 1451,
    endIndex: 1518,
  },
  {
    children: [
      {
        text: "B. They are gaining in popularity in different parts of the world",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 1518,
    endIndex: 1584,
  },
  {
    children: [
      {
        text: "C. They have only been built in technologically developed countries",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 1584,
    endIndex: 1652,
  },
  {
    children: [
      {
        text: "D. They are more economical and produce no pollution",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 1652,
    endIndex: 1705,
  },
  {
    children: [
      {
        text: "===",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "SUBTITLE",
    type: "paragraph",
    startIndex: 1705,
    endIndex: 1709,
  },
  {
    children: [
      {
        text: "Giải thích : Đáp án A",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 1709,
    endIndex: 1731,
  },
  {
    children: [
      {
        text: "Câu 9: According to paragraph 1, the environmental goals set by green builders were initially considered unrealistic presumably because _______?",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "HEADING_4",
    type: "paragraph",
    startIndex: 1731,
    endIndex: 1876,
  },
  {
    children: [
      {
        text: "A. there was a lack of green builders at the beginning of the 20th century.",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 1876,
    endIndex: 1952,
  },
  {
    children: [
      {
        text: "B. the potential applications of technology to constructing green buildings were not recognised then",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 1952,
    endIndex: 2053,
  },
  {
    children: [
      {
        text: "C. there was an abundance of natural materials for the construction of conventional buildings.",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 2053,
    endIndex: 2148,
  },
  {
    children: [
      {
        text: "D. the problems of environment destruction were not prevalent at the time.",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 2148,
    endIndex: 2223,
  },
  {
    children: [
      {
        text: "===",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "SUBTITLE",
    type: "paragraph",
    startIndex: 2223,
    endIndex: 2227,
  },
  {
    children: [
      {
        text: "Giải thích : Đáp án A",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 2227,
    endIndex: 2249,
  },
  {
    children: [
      {
        text: "Câu 10: The word “insulation” in paragraph 3 mostly means _______.",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "HEADING_4",
    type: "paragraph",
    startIndex: 2249,
    endIndex: 2316,
  },
  {
    children: [
      {
        text: "A. devices that monitor changes in temperature",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 2316,
    endIndex: 2363,
  },
  {
    children: [
      {
        text: "B. panels that convert solar energy into electricity",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 2363,
    endIndex: 2416,
  },
  {
    children: [
      {
        text: "C. materials that prevent heat loss and absorption",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 2416,
    endIndex: 2467,
  },
  {
    children: [
      {
        text: "D. systems that protect buildings from the sun’s rays",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 2467,
    endIndex: 2521,
  },
  {
    children: [
      {
        text: "===",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "SUBTITLE",
    type: "paragraph",
    startIndex: 2521,
    endIndex: 2525,
  },
  {
    children: [
      {
        text: "Giải thích : Đáp án A",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 2525,
    endIndex: 2547,
  },
  {
    children: [
      {
        text: "Câu 11: Which of the following is NOT mentioned in paragraph 7 as a merit of green buildings?",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "HEADING_4",
    type: "paragraph",
    startIndex: 2547,
    endIndex: 2641,
  },
  {
    children: [
      {
        text: "A. Proving more economical eventually. B. Being friendly to the environment.",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 2641,
    endIndex: 2718,
  },
  {
    children: [
      {
        text: "C. Increasing work productivity D. Improving living conditions",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 2718,
    endIndex: 2781,
  },
  {
    children: [
      {
        text: "Câu 12: The word “they” in paragraph 2 refers to _______.",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 2781,
    endIndex: 2839,
  },
  {
    children: [
      {
        text: "A. rays of the sun ",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 2839,
    endIndex: 2859,
  },
  {
    children: [
      {
        text: "B. solar panels. ",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 2859,
    endIndex: 2877,
  },
  {
    children: [
      {
        text: "C. green builders ",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 2877,
    endIndex: 2896,
  },
  {
    children: [
      {
        text: "D. recycled materials",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 2896,
    endIndex: 2918,
  },
  {
    children: [
      {
        text: "===",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "SUBTITLE",
    type: "paragraph",
    startIndex: 2918,
    endIndex: 2922,
  },
  {
    children: [
      {
        text: "Giải thích : Đáp án A",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 2922,
    endIndex: 2944,
  },
  {
    children: [
      {
        text: "",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 2944,
    endIndex: 2945,
  },
  {
    children: [
      {
        text: "Câu 13: Which of the following does the passage mainly discuss?",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: "END",
    nameStyle: "HEADING_4",
    type: "paragraph",
    startIndex: 2945,
    endIndex: 3009,
  },
  {
    children: [
      {
        text: "A. Economic benefits of environmentally responsible buildings.",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 3009,
    endIndex: 3072,
  },
  {
    children: [
      {
        text: "B. Successful green building projects all over the world",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 3072,
    endIndex: 3129,
  },
  {
    children: [
      {
        text: "C. An environmentally friendly approach to constructing buildings",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 3129,
    endIndex: 3195,
  },
  {
    children: [
      {
        text: "D. New technologies applied to constructing office buildings",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 3195,
    endIndex: 3256,
  },
  {
    children: [
      {
        text: "===",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "SUBTITLE",
    type: "paragraph",
    startIndex: 3256,
    endIndex: 3260,
  },
  {
    children: [
      {
        text: "Giải thích : Đáp án A",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 3260,
    endIndex: 3282,
  },
  {
    children: [
      {
        text: "",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 3282,
    endIndex: 3283,
  },
  {
    children: [
      {
        text: "",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 3283,
    endIndex: 3284,
  },
  {
    children: [
      {
        text: "",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 3284,
    endIndex: 3285,
  },
  {
    children: [
      {
        text: "",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 3285,
    endIndex: 3286,
  },
  {
    children: [
      {
        text: "",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 3286,
    endIndex: 3287,
  },
  {
    children: [
      {
        text: "",
        italic: false,
        bold: false,
        underline: false,
      },
    ],
    align: null,
    nameStyle: "NORMAL_TEXT",
    type: "paragraph",
    startIndex: 3287,
    endIndex: 3288,
  },
];
