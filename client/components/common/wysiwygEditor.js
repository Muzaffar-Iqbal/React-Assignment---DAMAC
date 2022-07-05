import React from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
class WysiwygEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      html: this.props.editorHtml,
    };
    const contentBlock = htmlToDraft(this.state.html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      this.state.editorState = editorState;
    }
  }
  onEditorStateChange = (editorState) => {
    let inputHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    this.setState({
      editorState,
    });
    this.props.updateHtml(inputHtml);
  };
  render() {
    let { editorState } = this.state;
    return (
      <Editor
        readOnly={this.props.disabled}
        editorState={editorState}
        wrapperClassName="wrapper-wysiwyg"
        editorClassName="editor-wysiwyg"
        toolbarClassName="toolbar-wysiwyg"
        onEditorStateChange={this.onEditorStateChange}
        // stripPastedStyles={false}
        handlePastedText={(text, html, editorState) => {
          return false;
        }}
      />
    );
  }
}

export default WysiwygEditor;
