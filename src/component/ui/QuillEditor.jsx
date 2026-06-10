import React from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const EditorWrapper = styled.div`
    width: 100%;

    .ql-toolbar.ql-snow {
        border: none;
        border-bottom: 1px solid #e9ecef;
        padding: 12px 8px;
        display: flex;
        flex-wrap: wrap; 
        align-items: center;
        gap: 12px;
    }

    .ql-toolbar.ql-snow .ql-formats {
        display: flex;
        align-items: center;
        margin: 0; 
    }

    .ql-toolbar.ql-snow button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        margin: 0;
    }

    .ql-container.ql-snow {
        border: none;
        font-size: 16px;
        color: #212529;
        font-family: inherit;
        min-height: ${(props) => props.height || '450px'};
    }

    .ql-editor {
        padding: 16px;
    }

    .ql-editor.ql-blank::before {
        left: 16px;
        color: #adb5bd;
        font-style: normal;
    }
`;

function QuillEditor({ value, onChange, placeholder, height }) {
    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
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