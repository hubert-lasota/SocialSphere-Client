import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function UserProfile() {
  const urlParams = useParams();

  useEffect(() => {
    console.log(urlParams.id);
  });

  return (
    <div>UserProfile</div>
  );
}
