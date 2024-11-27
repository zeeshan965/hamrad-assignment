import {Details} from "../hooks/useSearchRecord.ts";
interface DetailsTableProps {
  details: Details;
}


const DetailsTable: React.FC<DetailsTableProps> = ({ details }) =>{
    return(

  <table className="table table-striped table-hover">
    <tbody>
      <tr>
        <td>Name:</td>
        <td>{details.full_name}</td>
      </tr>
      <tr>
        <td>Callsign:</td>
        <td>{details.callsign}</td>
      </tr>
      <tr>
        <td>Class:</td>
        <td>{details.class}</td>
      </tr>
      <tr>
        <td>Status:</td>
        <td>{details.status}</td>
      </tr>
      <tr>
        <td>Grid:</td>
        <td>{details.grid}</td>
      </tr>
      <tr>
        <td>Expires:</td>
        <td>{details.expires}</td>
      </tr>
      <tr>
        <td>Address:</td>
        <td>{details.address.state +', '+ details.address.city}</td>
      </tr>
      <tr>
        <td>FCC ULS:</td>
        <td>
          <a href={details.fccUrl} target="_blank" rel="noreferrer">View Record</a>
        </td>
      </tr>
      <tr>
        <td>Formats:</td>
        <td>
          <a href={details.xmlUrl} target="_blank" rel="noreferrer">xml</a>{' '}
          <a href={details.jsonUrl} target="_blank" rel="noreferrer">json</a>{' '}
          <a href={details.csvUrl} target="_blank" rel="noreferrer">csv</a>
        </td>
      </tr>
    </tbody>
  </table>)}


export default DetailsTable;
