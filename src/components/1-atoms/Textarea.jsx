function Textarea ({ name, value, onChange, placeholder = ''}) {
    return (
        <textarea
        name = {name}
        value = {value}
        onChange = {onChange}
        placeholder = {placeholder}
        className = "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
    );
}

export default Textarea;