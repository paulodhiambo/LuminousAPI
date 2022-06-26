export default function auth ({ next , router }){
  if(localStorage.getItem('Fikisha_token')===null || localStorage.getItem('Fikisha_token')===undefined){
    return router.push({ name: 'login' })
  }
  return next()
}
