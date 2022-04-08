import { MdQrCode2 } from "react-icons/md";
import { useState } from "react";
import QRCode from "react-qr-code";

const ShowQR = (qrValue) => {
  const [show, setShow] = useState(false);

  return (
    <div onClick={() => setShow(!show)} className='hover:cursor-pointer w-fit'>
      {show ? <QRCode
        value={qrValue}
        level="M"
        bgColor="#F4F7FC"
        className="my-5"
      />
        :
        <div className="flex gap-5 items-center">
          <span className="font-bold">QR-kode (klikk):</span>
          <MdQrCode2 size={55} />
        </div>
      }
    </div>
  );
};

export default ShowQR;