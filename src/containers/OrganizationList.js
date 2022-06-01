import React, { useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const BaseURL = axios.create({
  baseURL: 'https://reactassessmentapi20220523183259.azurewebsites.net/api/',
});

const OrganizationList = () => {
  const navigate = useNavigate();
  const [cboList, setCboList] = useState()
  const [programList, setProgramList] = useState()

  useEffect(() => {
    getData()
    getPrograms()
  }, [])

  const getData = () => {
    BaseURL.get('/cbo')
      .then(function (response) {
        // handle success
        console.log(response);
        setCboList(response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }
  const getPrograms = () => {
    BaseURL.get(`/programs`)
      .then(function (response) {
        // handle success
        console.log(response);
        setProgramList(response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }
  console.log('CBO', cboList)
  console.log('Programs', programList)
  return <div>
    <h2>Organizations</h2>
    <table border="1">
      {cboList?.map(cbo => <tr key={cbo.id}>
        <td>{cbo.organizationName}</td>
        <td>{cbo.phone}</td>
        <td>{cbo.pointOfContact}</td>
        <td>{cbo.email}</td>
        <td>{programList?.find(p => p.cboId === cbo.id)?.name}</td>
        <td>{programList?.find(p => p.cboId === cbo.id)?.description}</td>
        <td>{programList?.find(p => p.cboId === cbo.id)?.classification}</td>
      </tr>)}
    </table>
    <button type="submit" onClick={() => navigate('/')}>
      Back to Home
      </button>
  </div>
}

export default OrganizationList