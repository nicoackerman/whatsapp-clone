import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";

export default function ChannelVisualsPlacehoder() {
  return (
    <>
      <Card className="mx-auto mt-10 w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-muted-foreground text-center">
            Nada por aquí todavía
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-2 text-center text-sm">
          <p>Selecciona un canal de la izquierda</p>
          <p>O comienza a escribir un nuevo borrador</p>
        </CardContent>
      </Card>
    </>
  );
}
