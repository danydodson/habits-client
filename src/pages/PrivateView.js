import React from 'react'

export default function PrivateView() {
   return (
      <div>
         <h5>This view can only be seen if the user is logged in because it's inside the IsPrivate component.</h5>
      </div>
   )
}
