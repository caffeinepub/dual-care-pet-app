import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface Reminder {
    id: bigint;
    time: Time;
    enabled: boolean;
    reminderType: string;
    lastDone: Time;
}
export interface PetProfile {
    age: bigint;
    name: string;
    energyLevel: bigint;
    petType: string;
}
export interface VaccinationRecord {
    date: Time;
    vaccineName: string;
    notes: string;
}
export interface WeightLog {
    weight: number;
    date: Time;
}
export interface GalleryPost {
    id: bigint;
    imageData: string;
    likes: bigint;
    caption: string;
    comments: Array<string>;
}
export interface MedicalNote {
    date: Time;
    text: string;
}
export interface backendInterface {
    addGalleryPost(post: GalleryPost): Promise<void>;
    addMedicalNote(note: MedicalNote): Promise<void>;
    addReminder(reminder: Reminder): Promise<void>;
    addVaccinationRecord(record: VaccinationRecord): Promise<void>;
    addWeightLog(log: WeightLog): Promise<void>;
    deleteGalleryPost(id: bigint): Promise<void>;
    deleteMedicalNote(date: Time): Promise<void>;
    deleteReminder(id: bigint): Promise<void>;
    deleteVaccinationRecord(date: Time): Promise<void>;
    deleteWeightLog(date: Time): Promise<void>;
    getAllGalleryPosts(): Promise<Array<GalleryPost>>;
    getAllMedicalNotes(): Promise<Array<MedicalNote>>;
    getAllReminders(): Promise<Array<Reminder>>;
    getAllVaccinationRecords(): Promise<Array<VaccinationRecord>>;
    getAllWeightLogs(): Promise<Array<WeightLog>>;
    getGalleryPost(id: bigint): Promise<GalleryPost>;
    getMedicalNote(date: Time): Promise<MedicalNote>;
    getPetProfile(): Promise<PetProfile | null>;
    getReminder(id: bigint): Promise<Reminder>;
    getVaccinationRecord(date: Time): Promise<VaccinationRecord>;
    getWeightLog(date: Time): Promise<WeightLog>;
    setPetProfile(profile: PetProfile): Promise<void>;
    updateGalleryPost(post: GalleryPost): Promise<void>;
    updateMedicalNote(note: MedicalNote): Promise<void>;
    updateReminder(reminder: Reminder): Promise<void>;
    updateVaccinationRecord(record: VaccinationRecord): Promise<void>;
    updateWeightLog(log: WeightLog): Promise<void>;
}
