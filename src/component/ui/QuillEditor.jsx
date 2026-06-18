import React from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const EditorWrapper = styled.div`
    width: 100%;

    .ql-toolbar.ql-snow {
        border: 1px solid ${props => props.theme.border || '#e9ecef'};
        border-radius: 12px 12px 0 0;
        background-color: ${props => props.theme.body || '#fff'};
        padding: 12px;
    }

    .ql-toolbar.ql-snow .ql-formats {
        margin-right: 15px;
    }

    .ql-container.ql-snow {
        border: 1px solid ${props => props.theme.border || '#e9ecef'};
        border-top: none;
        border-radius: 0 0 12px 12px;
        font-size: 16px;
        color: ${props => props.theme.text || '#212529'};
        font-family: inherit;
        min-height: ${(props) => props.height || '450px'};
        background-color: ${props => props.theme.cardBody || '#fff'};
    }

    .ql-editor {
        padding: 20px;
        line-height: 1.6;
    }

    .ql-editor.ql-blank::before {
        left: 20px;
        color: #adb5bd;
        font-style: normal;
    }
`;

function QuillEditor({ value, onChange, placeholder, height }) {
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }], // h1, h2, h3 조절 가능하도록 추가
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link"],
            ["clean"],
        ],
    };

    return (
        <EditorWrapper height={height}>
            <ReactQuill
                theme="snow"
                modules={modules}
                value={value}
                onChange={onChange}
                placeholder={placeholder || "내용을 입력하세요..."}
            />
        </EditorWrapper>
    );
}

export default QuillEditor;