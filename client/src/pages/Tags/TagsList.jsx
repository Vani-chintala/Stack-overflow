
const TagsList = ({list}) => {
    return (
        <div className="tag">
            <h5>{list.tagName}</h5>
            <p>{list.tagDesc}</p>
        </div>
    )
}

export default TagsList