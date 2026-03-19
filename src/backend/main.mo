import Time "mo:core/Time";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";

actor {
  type Reminder = {
    id : Nat;
    reminderType : Text;
    time : Time.Time;
    enabled : Bool;
    lastDone : Time.Time;
  };

  type GalleryPost = {
    id : Nat;
    imageData : Text;
    caption : Text;
    likes : Nat;
    comments : [Text];
  };

  type PetProfile = {
    name : Text;
    petType : Text;
    age : Nat;
    energyLevel : Nat;
  };

  type WeightLog = {
    date : Time.Time;
    weight : Float;
  };

  type VaccinationRecord = {
    date : Time.Time;
    vaccineName : Text;
    notes : Text;
  };

  type MedicalNote = {
    text : Text;
    date : Time.Time;
  };

  // Storage
  let reminders = Map.empty<Nat, Reminder>();
  let galleryPosts = Map.empty<Nat, GalleryPost>();
  var petProfile : ?PetProfile = null;
  let weightLogs = Map.empty<Time.Time, WeightLog>();
  let vaccinationRecords = Map.empty<Time.Time, VaccinationRecord>();
  let medicalNotes = Map.empty<Time.Time, MedicalNote>();

  // Reminder CRUD
  public shared ({ caller }) func addReminder(reminder : Reminder) : async () {
    reminders.add(reminder.id, reminder);
  };

  public query ({ caller }) func getReminder(id : Nat) : async Reminder {
    switch (reminders.get(id)) {
      case (null) { Runtime.trap("Reminder does not exist") };
      case (?reminder) { reminder };
    };
  };

  public query ({ caller }) func getAllReminders() : async [Reminder] {
    reminders.values().toArray();
  };

  public shared ({ caller }) func updateReminder(reminder : Reminder) : async () {
    if (not reminders.containsKey(reminder.id)) {
      Runtime.trap("Reminder does not exist");
    };
    reminders.add(reminder.id, reminder);
  };

  public shared ({ caller }) func deleteReminder(id : Nat) : async () {
    if (not reminders.containsKey(id)) {
      Runtime.trap("Reminder does not exist");
    };
    reminders.remove(id);
  };

  // GalleryPost CRUD
  public shared ({ caller }) func addGalleryPost(post : GalleryPost) : async () {
    galleryPosts.add(post.id, post);
  };

  public query ({ caller }) func getGalleryPost(id : Nat) : async GalleryPost {
    switch (galleryPosts.get(id)) {
      case (null) { Runtime.trap("GalleryPost does not exist") };
      case (?post) { post };
    };
  };

  public query ({ caller }) func getAllGalleryPosts() : async [GalleryPost] {
    galleryPosts.values().toArray();
  };

  public shared ({ caller }) func updateGalleryPost(post : GalleryPost) : async () {
    if (not galleryPosts.containsKey(post.id)) {
      Runtime.trap("GalleryPost does not exist");
    };
    galleryPosts.add(post.id, post);
  };

  public shared ({ caller }) func deleteGalleryPost(id : Nat) : async () {
    if (not galleryPosts.containsKey(id)) {
      Runtime.trap("GalleryPost does not exist");
    };
    galleryPosts.remove(id);
  };

  // PetProfile CRUD
  public shared ({ caller }) func setPetProfile(profile : PetProfile) : async () {
    petProfile := ?profile;
  };

  public query ({ caller }) func getPetProfile() : async ?PetProfile {
    petProfile;
  };

  // WeightLog CRUD
  public shared ({ caller }) func addWeightLog(log : WeightLog) : async () {
    weightLogs.add(log.date, log);
  };

  public query ({ caller }) func getWeightLog(date : Time.Time) : async WeightLog {
    switch (weightLogs.get(date)) {
      case (null) { Runtime.trap("Weight log does not exist") };
      case (?log) { log };
    };
  };

  public query ({ caller }) func getAllWeightLogs() : async [WeightLog] {
    weightLogs.values().toArray();
  };

  public shared ({ caller }) func updateWeightLog(log : WeightLog) : async () {
    if (not weightLogs.containsKey(log.date)) {
      Runtime.trap("Weight log does not exist");
    };
    weightLogs.add(log.date, log);
  };

  public shared ({ caller }) func deleteWeightLog(date : Time.Time) : async () {
    if (not weightLogs.containsKey(date)) {
      Runtime.trap("Weight log does not exist");
    };
    weightLogs.remove(date);
  };

  // VaccinationRecord CRUD
  public shared ({ caller }) func addVaccinationRecord(record : VaccinationRecord) : async () {
    vaccinationRecords.add(record.date, record);
  };

  public query ({ caller }) func getVaccinationRecord(date : Time.Time) : async VaccinationRecord {
    switch (vaccinationRecords.get(date)) {
      case (null) { Runtime.trap("Vaccination record does not exist") };
      case (?record) { record };
    };
  };

  public query ({ caller }) func getAllVaccinationRecords() : async [VaccinationRecord] {
    vaccinationRecords.values().toArray();
  };

  public shared ({ caller }) func updateVaccinationRecord(record : VaccinationRecord) : async () {
    if (not vaccinationRecords.containsKey(record.date)) {
      Runtime.trap("Vaccination record does not exist");
    };
    vaccinationRecords.add(record.date, record);
  };

  public shared ({ caller }) func deleteVaccinationRecord(date : Time.Time) : async () {
    if (not vaccinationRecords.containsKey(date)) {
      Runtime.trap("Vaccination record does not exist");
    };
    vaccinationRecords.remove(date);
  };

  // MedicalNote CRUD
  public shared ({ caller }) func addMedicalNote(note : MedicalNote) : async () {
    medicalNotes.add(note.date, note);
  };

  public query ({ caller }) func getMedicalNote(date : Time.Time) : async MedicalNote {
    switch (medicalNotes.get(date)) {
      case (null) { Runtime.trap("Medical note does not exist") };
      case (?note) { note };
    };
  };

  public query ({ caller }) func getAllMedicalNotes() : async [MedicalNote] {
    medicalNotes.values().toArray();
  };

  public shared ({ caller }) func updateMedicalNote(note : MedicalNote) : async () {
    if (not medicalNotes.containsKey(note.date)) {
      Runtime.trap("Medical note does not exist");
    };
    medicalNotes.add(note.date, note);
  };

  public shared ({ caller }) func deleteMedicalNote(date : Time.Time) : async () {
    if (not medicalNotes.containsKey(date)) {
      Runtime.trap("Medical note does not exist");
    };
    medicalNotes.remove(date);
  };
};
