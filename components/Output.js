//This component returns a react element that either contains a paragrpah tag with output prop rendered as HTML or any emptym fragments if "output" prop is false

export default function Output({output}) {
    return output ? <p dangerouslySetInnerHTML={{__html: output}}></p> : <></>;
}