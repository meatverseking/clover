import { FaFolder } from 'react-icons/fa'

function Folder() {
  return (
    <div className="flex flex-col">
      <div className="icon">
        <FaFolder color="#1890FF" className="w-[70px] h-[70px]" />
      </div>
      <div className="text-lg font-bold text-gray-800">Folder</div>
      <div className="text-base font-medium text-gray-700">223MB</div>
    </div>
  )
}

export default Folder;