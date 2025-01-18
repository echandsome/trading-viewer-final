import './index.css'
const LoadingSpinner = () => {
  return (
          <div className='flex justify-center items-center w-full h-full'>
            <div className="lds-ring flex justify-center items-center"><div></div><div></div><div></div><div></div></div>
          </div>
  )
}

export default LoadingSpinner