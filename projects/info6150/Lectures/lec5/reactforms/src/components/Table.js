export const Table = ({tableData}) => {
    return tableData.map((data, idx) => {
       return <div key={idx}>
           {`Name: ${data.name} - Email: ${data.email}`}
       </div>
    });
}