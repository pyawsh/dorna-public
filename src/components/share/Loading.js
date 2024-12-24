import {CircularProgress} from "@mui/joy";

const LoadingComponent = () => {
  return <div className="d-flex flex-column gap-2 w-100 my-80 position-relative justify-content-center align-items-center">
    <div>درحال بارگیری</div>
    <div>لطفا کمی صبر کنید!</div>
    <CircularProgress variant="soft" />
  </div>
}
export default LoadingComponent;