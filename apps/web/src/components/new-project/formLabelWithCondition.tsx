import { projectFormAction } from "@/src/constant/formAction";
import { FormLabel } from "../ui/form";

export default function FormLabelWithCondition({
  label,
  action,
}: {
  label: string;
  action: projectFormAction;
}) {
  return (
    <FormLabel className="font-bold text-sm">
      {label}
      {action === projectFormAction.INFO ? null : (
        <span className="text-red">*</span>
      )}
    </FormLabel>
  );
}
