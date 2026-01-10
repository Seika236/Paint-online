import { MyHeader } from "@/components/MyHeader.jsx";
import { MyCanvas } from "@/components/MyCavas.jsx";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { v4 } from "uuid";
import { MyDialog } from "@/components/MyDialog.jsx";
import { Input } from "@/components/ui/input.js";
import { Button } from "@/components/ui/button.js";
import { SocketAtom } from "@/store/socketAtom.js";
import { useAtomValue } from "jotai";
import { UseCanvasPage } from "@/hooks/UseCanvasPage.jsx";
import { NameDialogAtom } from "@/store/dialogAtom.js";

export function CanvasPage() {
  const isVisibleDialog = useAtomValue(NameDialogAtom);
  const socket = useAtomValue(SocketAtom);
  const params = useParams();
  const [name, setName] = useState("");
  const { setConnect } = UseCanvasPage();

  const navigate = useNavigate();
  useEffect(() => {
    if (!params.id) {
      navigate(`/${v4()}`);
    }
  }, [params.id]);

  const onConnectionHandler = () => {
    setConnect(socket, params, name);
  };

  const onChangeName = (event) => {
    setName(event.target.value);
  };

  return (
    <>
      <MyHeader />
      <MyCanvas />
      <MyDialog isOpen={isVisibleDialog}>
        <div className={"grid gap-y-3"}>
          <Input onChange={onChangeName} />
          <Button onClick={onConnectionHandler}>отправить</Button>
        </div>
      </MyDialog>
    </>
  );
}
