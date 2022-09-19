interface Props {
    message: String
}

export const ErrorPage = (props:Props) => {
    return <div>Error: { props.message}</div>
}