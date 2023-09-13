import Image from "next/image"
import loader from "@/app/assets/img/output-onlinegiftools.gif"
const Loading = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-white-500">
      <div className="xs:w-9/12 md:w-6/12">
        <Image src={loader} alt="loader image" />
      </div>
    </div>
  )
}

export default Loading