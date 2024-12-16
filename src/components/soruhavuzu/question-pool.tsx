"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Question, User } from "@/types/questions";
import { useRouter } from "next/navigation";

interface QuestionPoolProps {
  questions: Question[];
  currentUser: User;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  isSubQuestion?: boolean;
}

export function QuestionPool({
  questions,
  currentUser,
  onEdit,
  onDelete,
  isSubQuestion = false,
}: QuestionPoolProps) {
  const router = useRouter();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {isSubQuestion ? "Alt Sorular" : "Temel Sorular"}
        </h2>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">Sıralama</TableHead>
            <TableHead className="w-16">No</TableHead>
            <TableHead>Soru</TableHead>
            <TableHead>İlgili Alanlar</TableHead>
            <TableHead className="w-32"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {questions.map((question) => (
            <TableRow key={question.id}>
              <TableCell>
                <Button variant="ghost" size="sm" className="cursor-move">
                  ⋮⋮
                </Button>
              </TableCell>
              <TableCell>{question.sequence}</TableCell>
              <TableCell>{question.text}</TableCell>
              <TableCell>{question.areas.join(", ")}</TableCell>
              <TableCell className="text-right space-x-2">
                {!isSubQuestion && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      router.push(`/soruhavuzu/${question.id}/altsoru`)
                    }
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                )}
                {currentUser.isAdmin && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(question.id)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(question.id)}
                      disabled={question.usedInInspection}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
