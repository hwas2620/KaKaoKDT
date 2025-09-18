import os
import shutil
from fastapi import FastAPI, File, UploadFile, HTTPException, Query, Request
from fastapi.responses import FileResponse, StreamingResponse
from typing import List, Optional
import zipstream

app = FastAPI()
UPLOAD_DIRECTORY = "./uploads"

if not os.path.exists(UPLOAD_DIRECTORY):
    os.makedirs(UPLOAD_DIRECTORY)

## 📂 1. 파일 업로드 (단일/다중)
@app.post("/files/upload", tags=["Files"])
async def upload_files(files: List[UploadFile] = File(...)):
    """
    **단일 또는 다중 파일을 업로드**합니다.

    - `files`: 업로드할 파일(들)
    """
    uploaded_filenames = []
    for file in files:
        file_path = os.path.join(UPLOAD_DIRECTORY, file.filename)
        # 보안을 위해 파일 경로 검증 (예: '../' 사용 방지)
        if ".." in file.filename:
            raise HTTPException(status_code=400, detail="Invalid filename.")
            
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        uploaded_filenames.append(file.filename)
        
    return {"message": "Files uploaded successfully", "filenames": uploaded_filenames}


## 📜 2. 파일 목록 조회 (페이징, 필터링)
@app.get("/files", tags=["Files"])
async def list_files(
    skip: int = 0, 
    limit: int = 10, 
    filter: Optional[str] = None
):
    """
    **업로드된 파일 목록을 조회**합니다. 페이징 및 필터링을 지원합니다.

    - `skip`: 건너뛸 파일 수 (페이지네이션)
    - `limit`: 한 페이지에 표시할 최대 파일 수 (페이지네이션)
    - `filter`: 파일 이름에 포함될 검색어 (필터링)
    """
    try:
        files = os.listdir(UPLOAD_DIRECTORY)
    except FileNotFoundError:
        return []

    if filter:
        files = [f for f in files if filter.lower() in f.lower()]
    
    total_files = len(files)
    paginated_files = files[skip : skip + limit]

    return {
        "total_files": total_files,
        "files": paginated_files
    }


## 📥 3. 파일 다운로드 (단일/다중 ZIP)
@app.get("/files/download", tags=["Files"])
async def download_files(filenames: List[str] = Query(...)):
    """
    **단일 또는 다중 파일을 다운로드**합니다.
    
    - `filenames`: 다운로드할 파일 이름(들). 1개면 단일 파일, 2개 이상이면 ZIP으로 압축하여 다운로드합니다.
    """
    if len(filenames) == 1:
        file_path = os.path.join(UPLOAD_DIRECTORY, filenames[0])
        if not os.path.isfile(file_path):
            raise HTTPException(status_code=404, detail="File not found")
        return FileResponse(path=file_path, media_type='application/octet-stream', filename=filenames[0])

    def zip_generator():
        z = zipstream.ZipFile(mode='w', compression=zipstream.ZIP_DEFLATED)
        for filename in filenames:
            file_path = os.path.join(UPLOAD_DIRECTORY, filename)
            if os.path.isfile(file_path):
                z.write(file_path, arcname=filename)
        
        for chunk in z:
            yield chunk

    response = StreamingResponse(zip_generator(), media_type="application/x-zip-compressed")
    response.headers["Content-Disposition"] = "attachment; filename=download.zip"
    return response


## 🗑️ 4. 파일 삭제 (단일/다중)
@app.delete("/files/delete", tags=["Files"])
async def delete_files(filenames: List[str] = Query(...)):
    """
    **단일 또는 다중 파일을 삭제**합니다.

    - `filenames`: 삭제할 파일 이름(들)
    """
    deleted_files = []
    errors = []
    
    for filename in filenames:
        file_path = os.path.join(UPLOAD_DIRECTORY, filename)
        if os.path.isfile(file_path):
            try:
                os.remove(file_path)
                deleted_files.append(filename)
            except OSError as e:
                errors.append({"filename": filename, "error": str(e)})
        else:
            errors.append({"filename": filename, "error": "File not found"})
            
    if not deleted_files and errors:
        raise HTTPException(status_code=404, detail={"message": "No files were deleted.", "errors": errors})

    return {"message": "Files deleted successfully", "deleted": deleted_files, "errors": errors}