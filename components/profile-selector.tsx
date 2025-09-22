"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { 
  User, 
  Plus, 
  Edit, 
  Trash2, 
  Star, 
  Calendar, 
  Building, 
  MapPin,
  Save,
  X
} from "lucide-react"
import { ProfileService, type UserProfile } from "@/lib/profile-service"
import type { CVData } from "@/lib/latex/schema"

interface ProfileSelectorProps {
  selectedProfile?: UserProfile | null
  onProfileSelect: (profile: UserProfile | null) => void
  onProfileSave?: (profile: UserProfile) => void
  className?: string
}

export function ProfileSelector({ selectedProfile, onProfileSelect, onProfileSave, className }: ProfileSelectorProps) {
  const [profiles, setProfiles] = useState<UserProfile[]>([])
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingProfile, setEditingProfile] = useState<UserProfile | null>(null)
  const [newProfileName, setNewProfileName] = useState("")

  useEffect(() => {
    loadProfiles()
  }, [])

  const loadProfiles = () => {
    const loadedProfiles = ProfileService.getUserProfiles()
    setProfiles(loadedProfiles)
    
    // Auto-select default profile if none selected
    if (!selectedProfile && loadedProfiles.length > 0) {
      const defaultProfile = ProfileService.getDefaultProfile()
      if (defaultProfile) {
        onProfileSelect(defaultProfile)
      }
    }
  }

  const handleSaveCurrentAsProfile = () => {
    if (!selectedProfile?.data || !newProfileName.trim()) return

    const newProfile = ProfileService.saveUserProfile({
      name: newProfileName.trim(),
      data: selectedProfile.data,
      isDefault: profiles.length === 0, // First profile becomes default
    })

    setProfiles(prev => [...prev, newProfile])
    setNewProfileName("")
    setIsCreateDialogOpen(false)
    onProfileSave?.(newProfile)
  }

  const handleDeleteProfile = (profileId: string) => {
    if (ProfileService.deleteUserProfile(profileId)) {
      setProfiles(prev => prev.filter(p => p.id !== profileId))
      if (selectedProfile?.id === profileId) {
        onProfileSelect(null)
      }
    }
  }

  const handleSetDefault = (profileId: string) => {
    const updated = ProfileService.updateUserProfile(profileId, { isDefault: true })
    if (updated) {
      loadProfiles()
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className={className}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <Label className="text-sm font-medium">Saved Profiles</Label>
          </div>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" disabled={!selectedProfile?.data}>
                <Plus className="h-4 w-4 mr-2" />
                Save Current
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Save Profile</DialogTitle>
                <DialogDescription>
                  Save your current information as a reusable profile
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="profileName">Profile Name</Label>
                  <Input
                    id="profileName"
                    value={newProfileName}
                    onChange={(e) => setNewProfileName(e.target.value)}
                    placeholder="e.g., Software Engineer Profile"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSaveCurrentAsProfile} disabled={!newProfileName.trim()}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Profile
                  </Button>
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {profiles.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-8 text-center">
              <User className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">No saved profiles yet</p>
              <p className="text-xs text-muted-foreground mt-1">
                Fill out your information and save it as a profile for easy reuse
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-3">
            {profiles.map((profile) => (
              <Card 
                key={profile.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedProfile?.id === profile.id 
                    ? 'ring-2 ring-primary bg-primary/5' 
                    : 'hover:bg-muted/50'
                }`}
                onClick={() => onProfileSelect(profile)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium truncate">{profile.name}</h4>
                        {profile.isDefault && (
                          <Badge variant="secondary" className="text-xs">
                            <Star className="h-3 w-3 mr-1" />
                            Default
                          </Badge>
                        )}
                      </div>
                      
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <User className="h-3 w-3" />
                          <span className="truncate">{profile.data.fullName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3" />
                          <span>Updated {formatDate(profile.updatedAt)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 ml-2">
                      {!profile.isDefault && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleSetDefault(profile.id)
                          }}
                          className="h-8 w-8 p-0"
                        >
                          <Star className="h-3 w-3" />
                        </Button>
                      )}
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteProfile(profile.id)
                        }}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {selectedProfile && (
          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-primary" />
              <span className="font-medium">Selected:</span>
              <span>{selectedProfile.name}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
